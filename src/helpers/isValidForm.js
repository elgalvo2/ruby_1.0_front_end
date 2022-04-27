
function isValidForm(name, value, password, confirm_password) {
    switch (name) {
        case 'matricula':
            const onlytext = isNaN(value)
            const size = value.length
            if (onlytext) {
                return 'Ingrese solo numeros'
            }

            if (size!== 0 && size < 8) {
                return 'La matricula debe tener almenos 8 caracteres'
            }
            return ''
            break;
        case 'password':
            const s = value.length
            if(s!==0 && s<8){
                return 'La contrasena debe tener almenos 8 caracteres'
            }
            if(value!==confirm_password && confirm_password.length !== 0){
                return 'La contrasena no coincide'
            }
            return ''
            break;
        case 'confirm_password':
            if(value!=password){
                return 'La contransena no coincide'
            }
            return ''

        default:
            break;
    }
}

module.exports = isValidForm;

