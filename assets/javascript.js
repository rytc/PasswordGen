let generator = {
    length:    0,
    lc:        true,
    uc:        true,
    numerical: true,
    special:   true
};

const alpha_list   = 'abcdefghijklmnopqrstuvwxyz';
const num_list     = '1234567890';
const spec_list    = '!@#$%^&*()_+}{[]/.,<>?\\|~`:\";\'';

const generate_password = () => {
    if(generator.lc         === false &&
        generator.uc        === false &&
        generator.numerical === false &&
        generator.special   === false) {
            swal("Invalid password criteria selected. Must select at least one character type.", {
                    icon: "error"
                });
    } else {
        let char_list = "";
        if(generator.lc) {
            char_list += alpha_list;
        }

        if(generator.uc) {
            char_list += alpha_list.toUpperCase();
        }

        if(generator.numerical) {
            char_list += num_list;
        }

        if(generator.special) {
            char_list += spec_list;
        }

        let result = "";

        for(let i = 0; i < generator.length; i++) {
            let char_index = Math.floor(Math.random() * char_list.length);
            let char = char_list.substr(char_index, 1);
            result = result + char;
        }

        document.getElementById('pw').textContent = result;
    }
}

const ask_for_specialchars = () => {
    swal("Use special characters?", {
        icon: "info",
        buttons: {
            yes: "Yes",
            no: "No"
        }
    }).then((value) => {
        if(value === 'yes') {
            generator.special = true;
        } else {
            generator.special = false;
        }
        generate_password();
    });
}

const ask_for_numeric = () => {
    swal("Use numerics?", {
        icon: "info",
        buttons: {
            yes: "Yes",
            no: "No"
        }
    }).then((value) => {
        if(value === 'yes') {
            generator.numerical = true;
        } else {
            generator.numerical = false;
        }
        ask_for_specialchars();
    });
}

const ask_for_uppercase = () => {
    swal("Use upper case?", {
        icon: "info",
        buttons: {
            yes: "Yes",
            no: "No"
        }
    }).then((value) => {
        if(value === 'yes') {
            generator.uc = true;
        } else {
            generator.uc = false;
        }
        ask_for_numeric();
    });
};

const ask_for_lowercase = () => {
    swal("Use lower case?", {
        icon: "info",
        buttons: {
            yes: "Yes",
            no: "No"
        }
    }).then((value) => {
        if(value === 'yes') {
            generator.lc = true;
        } else {
            generator.lc = false;
        }
        ask_for_uppercase();
    });
};

const begin_generator_prompts = () => {
    swal("Pick a password length (minimum of 8 characters, max of 128 characters)", {
        content: "input",
        icon: "info",
    }).then((value) => {
        generator.length = parseInt(value);
        if(generator.length < 8 || generator.length > 128 || isNaN(generator.length)) {
            begin_generator_prompts();
        } else {
            ask_for_lowercase();
        }
    });
};

document.getElementById('start_gen').addEventListener('click', () => begin_generator_prompts());
