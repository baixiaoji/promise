var test = require('tape');
var invertTree = require('./index.js');

test('null case', function (t) {
    t.plan(1)
    t.equal(invertTree(null), null);
});

test('no child', function (t) {
    t.plan(1)

    const root = {
        val: 4
    }
    t.same(tree2array(invertTree(root)), [4]);
});


test('single leaf node', function (t) {
    t.plan(1)

    const root = {
        val: 4,
        left: {
            val: 2
        }
    }
    t.same(tree2array(invertTree(root)), [4, 2]);
});


test('swipe children', function (t) {
    t.plan(1)

    const root = {
        val: 4,
        left: {
            val: 2,
            left: {
                val: 1
            },
            right: {
                val: 3
            }
        },
        right: {
            val: 7,
            left: {
                val: 6
            },
            right: {
                val: 9
            }
        }
    }
    t.same(tree2array(invertTree(root)), [4,7,2,9,6,3,1])
});




function tree2array(node) {
    if (!node) return [];

    const q = [node];
    const ret = []

    while(q.length) {
       const t = q.shift()
       ret.push(t.val)

       if (t.left) q.push(t.left)
       if (t.right) q.push(t.right)
    }

    return ret
}
