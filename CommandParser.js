// parses message text into an object.

const parse = (text) => {

    // remove the first character because it 
    // is the command indicator. 
    let sub = text.substring(1, text.length).toLowerCase(); 
    sub = sub.split(" "); 

    // first string in the array should be the main 
    let major = sub[0];
    let minor = "";
    let args = []; 

    if (sub.length > 1 ) {
        minor = sub[1];
        args = sub.slice(2, sub.length);
    }

    return {major: major, minor: minor, args: args};
}

exports.parse = parse; 