describe("Tree Functions", function() {
  var root;

  describe("#insert", function() {
    beforeEach(function() {
      root = _w.insert(null, 'education');
    });
    
    it("should insert a node", function() {
      expect(root.data).toEqual('education');
    });
    
    describe("left-side insertions", function() {
      it("should insert a lesser node to the left", function() {
        root = _w.insert(root, 'detente');
        expect(root.data).toEqual('detente');
        expect(root.right.data).toEqual('education');
      });
    
      it("should balance between two insertions", function() {
        root = _w.insert(root, 'detente');
        root = _w.insert(root, 'collectivism');
        expect(root.data).toEqual('detente');
        expect(root.left.data).toEqual('collectivism');
        expect(root.right.data).toEqual('education');
      });
    
      it("should rebalance when overloaded left", function() {
        _.each(['detente', 'collectivism', 'agronomy'], function(thing) {
          root = _w.insert(root, thing);
        });
        
        expect(root.data).toEqual('detente');
        expect(root.left.data).toEqual('agronomy');
        expect(root.left.right.data).toEqual('collectivism');
        expect(root.right.data).toEqual('education');
      });
    });

    describe("right-side insertions", function() {
      it("should insert a greater node to the right", function() {
        root = _w.insert(root, 'functionalism');
        expect(root.data).toEqual('education');
        expect(root.right.data).toEqual('functionalism');
      });
      
      it("should balance between two insertions", function() {
        _.each(['functionalism', 'glasnost'], function(thing) {
          root = _w.insert(root, thing);
        });

        expect(root.data).toEqual('functionalism');
        expect(root.left.data).toEqual('education');
        expect(root.right.data).toEqual('glasnost');
      });
    
      it("should rebalance when overloaded right", function() {
        _.each(['functionalism', 'glasnost', 'horosho'], function(thing) {
          root = _w.insert(root, thing);
        });
      
        expect(root.data).toEqual('functionalism');
        expect(root.left.data).toEqual('education');
        expect(root.right.data).toEqual('glasnost');
        expect(root.right.right.data).toEqual('horosho');
      });
    });

    it("should balance a massive insert", function() {
      _.each(['detente', 'collectivism', 'bolshevism', 'agronomy', 'functionalism', 'glasnost', 'horosho', 'irkutsk', 'karimov', 'lamsomov', 'moskva', 'novgorod', 'oprichnina', 'perestroika'], function(thing) {
        root = _w.insert(root, thing);
      });
      
      expect(root.data).toEqual('horosho');
    });
  });
  
  describe("#remove", function() {
    beforeEach(function() {
      root = _w.insert(null, 'education');
    });
    
    it("should remove a root node", function() {
      expect(_w.remove(root, 'education')).toBeNull();
    });
    
    it("should remove a child node", function() {
      root = _w.insert(root, 'functionalism');
      root = _w.remove(root, 'functionalism');
      expect(root).not.toBeNull();
      expect(root.data).toEqual('education');
      expect(root.right).toBeNull();
      expect(root.left).toBeNull();
    });
    
    it("should shift a node up when deleting level 1 root nodes", function() {
      _.each(['detente', 'agronomy'], function(thing) {
        root = _w.insert(root, thing);
      });
      
      expect(root.left.data).toEqual('agronomy');
      expect(root.data).toEqual('detente');
      expect(root.right.data).toEqual('education');
      root = _w.remove(root, 'education');
      expect(root.right).toBeNull();
      
      root = _w.remove(root, 'detente');
      expect(root.left).toBeNull();
      expect(root.data).toEqual('agronomy');
      
      root = _w.insert(root, 'functionalism');
      expect(root.right.data).toEqual('functionalism');
      root = _w.remove(root, 'agronomy')
      expect(root.data).toEqual('functionalism');
      expect(root.left).toBeNull();
      expect(root.right).toBeNull();
    });

    it("should shift a node up when deleting a level 2 root", function() {
      _.each(['functionalism', 'detente'], function(thing) {
        root = _w.insert(root, thing);
      });
      expect(root.data).toEqual('education');
      
      root = _w.remove(root, 'education');
      
      expect(root.data).toEqual('detente');
      expect(root.left).toBeNull();
      expect(root.right.data).toEqual('functionalism');
    });

    it("should shift a node up when deleting a level 4 root", function() {
      _.each(['detente', 'collectivism', 'bolshevism', 'agronomy', 'functionalism', 'glasnost', 'horosho', 'irkutsk', 'karimov', 'lamsomov', 'moskva', 'novgorod', 'oprichnina', 'perestroika'], function(thing) {
        root = _w.insert(root, thing);
      });
      expect(root.data).toEqual('horosho');
      
      root = _w.remove(root, 'horosho');
      expect(root.data).toEqual('glasnost');
    });
  });
});