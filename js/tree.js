let treeData = {
    id: 0,
    name: '00',
    children: [
        {
            id: 1,
            name: '01',
            children: [
                {
                    id: 11,
                    name: '11',
                    children: []
                }]
        },
        {
            id: 2,
            name: '02',
            children: [
                {
                    id: 22,
                    name: '22',
                    children: []
                }]
        }]
}

function DepthFirstSearch(biTree) {
    let stack = [];
    stack.push(biTree);

    while (stack.length != 0) {
        let node = stack.pop();
        console.log(node.data);
        if (node.rChild) {
            stack.push(node.rChild);
        }
        if (node.lChild) {
            stack.push(node.lChild);
        }

    }

}
DepthFirstSearch(treeData)