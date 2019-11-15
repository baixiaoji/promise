function hasTreeNode(root) {
  return root.left && root.right;
}

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
  if (!root || !hasTreeNode(root)) {
    return root;
  }
  const {left: leftNode, right: rightNode} = root;

  root.left = hasTreeNode(rightNode) ? invertTree(rightNode) : rightNode;
  root.right = hasTreeNode(leftNode) ? invertTree(leftNode) : leftNode;
  return root;

};

module.exports = invertTree;
