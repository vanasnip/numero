process.stdin.on('readable', () => {
    const chunk = process.stdin.read();
    if (chunk !== null) {
        let testing = process.stdout.write(`data ${chunk}`);
        let zoom = chunk.toString().slice(0, -1);
        if ( zoom === 'endMe') {
            console.log(process);
        }
    }




});

process.stdin.on('exit', () => {
    process.stdout.write('end\n');
});