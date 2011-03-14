function printNode(node, depth) {
  if (node === null) { return ''; }
  if (depth === 0) { return node.data ? node.data + node.level.toString() : ''; }
  return '(' + ([printNode(node.left, depth - 1), printNode(node, 0), printNode(node.right, depth - 1)].join('-')) + ')';
}

function printStack(stack) {
  return _.map(stack, function(node){ return node.data; });
}
