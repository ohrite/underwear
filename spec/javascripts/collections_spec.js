describe("Collection Functions", function() {
  var root;
  
  beforeEach(function() {
    root = _w.insert(null, 'education');
    root = _w.insert(root, 'grain');
    root = _w.insert(root, 'cars');
  });
  
  describe("#each", function() {
    it("should iterate over a tree inorder", function() {
      var result = [];
      _w.each(root, function(value, index) { result[index] = value; });
      expect(result).toEqual(['cars', 'education', 'grain']);
    });
    
    it("should handle null properly", function() {
      var result = [];
      _w.each(null, function(value, index) { result[index] = value; });
      expect(result).toEqual([]);
    });
    
    it("should obey the context parameter", function() {
      var result = [];
      _w.each(root, function(value, index) {
        result[index] = this.modifier(value);
      }, {
        modifier: function(value) {
          return value.toUpperCase();
        }
      });
      expect(result).toEqual(['CARS', 'EDUCATION', 'GRAIN']);
    });
    
    it("should be able to access the tree from inside the iterator", function() {
      var result = [];
      _w.each(root, function(value, index, tree) {
        result[index] = _w.contains(tree, value);
      });
      expect(result).toEqual([true, true, true]);
    });
  });
  
  describe("#map", function() {
    it("should map a callback to each node", function() {
      expect(_w.map(root, function(value) { return value.toUpperCase() })).toEqual(['CARS', 'EDUCATION', 'GRAIN']);
    });
    
    it("should handle null properly", function() {
      expect(_w.map(null, function(value, index) { result[index] = value; })).toEqual([]);
    });
  });
  
  describe("#reduce", function() {
    it("should reduce all values to a single string", function() {
      expect(_w.reduce(root, function(string, value) { return string + value; })).toEqual('carseducationgrain');
    });
    
    it("should throw an exception on null without an initial value", function() {
      expect(function(){ _w.reduce(null, function() {}); }).toThrow('Reduce of empty tree with no initial value');
    });

    it("should silently exit with the provided intial value", function() {
      expect(_w.reduce(null, function() {}, 'nope')).toEqual('nope');
    });
  });
  
  describe("#reduceRight", function() {
    it("should reduce all values to a single string", function() {
      expect(_w.reduceRight(root, function(string, value) { return string + value; })).toEqual('graineducationcars');
    });
    
    it("should throw an exception on null without an initial value", function() {
      expect(function(){ _w.reduceRight(null, function() {}); }).toThrow('Reduce of empty tree with no initial value');
    });

    it("should silently exit with the provided intial value", function() {
      expect(_w.reduceRight(null, function() {}, 'nope')).toEqual('nope');
    });
  });
  
  describe("#detect", function() {
    it("should detect a node", function() {
      expect(_w.detect(root, function(value) { return value.toUpperCase() == 'CARS'; })).toEqual('cars');
    });
  });

  describe("#select", function() {
    it("should select nodes", function() {
      expect(_w.select(root, function(value) { return value < 'fyodor'; })).toEqual(['cars', 'education']);
    });
  });
  
  describe("#reject", function() {
    it("should reject nodes", function() {
      expect(_w.reject(root, function(value) { return value < 'fyodor'; })).toEqual(['grain']);
    });
  });

  describe("#all", function() {
    it("should accept an empty tree", function() {
      expect(_w.all(null)).toBeTruthy();
    });
    
    it("should pass a set of nodes", function() {
      expect(_w.all(root, function(value) { return value < 'zemlya'; })).toBeTruthy();
    });

    it("should fail a set of partially-matching nodes", function() {
      expect(_w.all(root, function(value) { return value < 'fyodor'; })).toBeFalsy();
    });
    
    it("should fail a set of non-matching nodes", function() {
      expect(_w.all(root, function(value) { return value > 'moskva'; })).toBeFalsy();
    });
  });
  
  describe("#any", function() {
    it("should reject an empty tree", function() {
      expect(_w.any(null)).toBeFalsy();
    });
    
    it("should pass a full set of true nodes", function() {
      expect(_w.any(root, function(value) { return value < 'zemlya'; })).toBeTruthy();
    });

    it("should pass a set of partially-matching nodes", function() {
      expect(_w.any(root, function(value) { return value < 'fyodor'; })).toBeTruthy();
    });

    it("should fail a set of non-matching nodes", function() {
      expect(_w.any(root, function(value) { return value > 'moskva'; })).toBeFalsy();
    });
  });
  
  describe("#include", function() {
    it("should reject an empty tree", function() {
      expect(_w.include(null, 'cars')).toBeFalsy();
    });
    
    it("should accept a value that is in the tree", function() {
      expect(_w.include(root, 'cars')).toBeTruthy();
    });

    it("should reject a value that is not in the tree", function() {
      expect(_w.include(root, 'moskva')).toBeFalsy();
    });
  });
  
  describe("#invoke", function() {
    it("should map a callback to each node", function() {
      var callback = jasmine.createSpy();
      var second = _w.insert(null, { value: 'hat', callme: callback });
      _w.invoke(second, 'callme', 'privet');
      expect(callback.callCount).toEqual(1);
      expect(callback).toHaveBeenCalledWith('privet');
    });
  });
  
  describe("#pluck", function() {
    it("should should pull properties from each node", function() {
      expect(_w.pluck(root, 'length')).toEqual([4, 9, 5]);
    });
  });
  
  describe("#min", function() {
    it("should perform a regular min operation", function() {
      expect(_w.min(root)).toEqual('cars');
    });

    it("should perform a computed min operation", function() {
      expect(_w.min(root, function(value) { return value.charCodeAt(); })).toEqual('cars');
    });
  });

  describe("#max", function() {
    it("should perform a regular max operation", function() {
      expect(_w.max(root)).toEqual('grain');
    });

    it("should perform a computed max operation", function() {
      expect(_w.max(root, function(value) { return value.charCodeAt(); })).toEqual('grain');
    });
  });
  
  describe("#toArray", function() {
    it("should serialize the tree inorder", function() {
      expect(_w.toArray(root)).toEqual(['cars', 'education', 'grain']);
    });
  });
  
  describe("#size", function() {
    it("should should compute the size of the tree", function() {
      expect(_w.size(root)).toEqual(3);
    });
  });
});