const username = document.querySelector('#username');
const pass = document.querySelector('#password');
const pass2 = document.querySelector('#password2');
const email = document.querySelector('#email');
const sendBtn = document.querySelector('.send');
const clearBtn = document.querySelector('.clear');
const popup = document.querySelector('.popup');

const showError = (input, msg) => {
    // argument INPUT przechowuje nasze INPUTY
    // argument MSG przechowuje placeholder
    const formBox = input.parentElement;
    const errorMsg = formBox.querySelector('.error-text');

    formBox.classList.add('error');
    errorMsg.textContent = msg;
}

const clearError = input => {
    const formBox = input.parentElement;
    formBox.classList.remove('error')
}

const checkForm = input => {
    input.forEach(el => {
        if (el.value === '') {
            showError(el, el.placeholder)
        } else {
            clearError(el)
        };
    });
};
// argument INPUT z funkcji "checkForm" przechowuje tablicę z inputami
// argument EL odnosi się do każedej zmiennej, która jest w tablicy



// SPRAWDZANIE CZY UŻYTKOWNIK WPISAŁ ODPOWIEDNIĄ ILOŚĆ ZNAKÓW
const checkLength = (input, min) => {
    if(input.value.length < min) {
        showError(input, `${input.previousElementSibling.innerText.slice(0,-1)} składa się z min. ${min} znaków.`)
    }
}
// previousElementSibling.innerText PODAJE  NAZWĘ DANEGO ELEMENTU CZYLI NP HASŁA, NAZWY UŻYTKOWNIKA

// sprawdzanie czy hasła są takie same 
const checkPassword = (pass1) => {
      if (pass1.value !== pass2.value) {
          showError(pass2, 'Hasła do siebie nie pasują!')
      }
}

// sprawdzanie czy e-mail jest poprawny
const checkMail = email => {
    
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(re.test(email.value)) {
            clearError(email)
        } else {
            showError(email, 'E-mail jest niepoprawny')
        }
        
    
}
// symulacja wysyłania formularza jeśli nie ma żadnych błędów
const checkErrors = () => {
    const allInputs = document.querySelectorAll('.form-box');
    let errorCount = 0; 
    // let errorCount musi przechowywac 0 żeby wysłał się formularz.

    // sprawdzanie czy są jakieś błędy w formularzu
    allInputs.forEach(el => {
        if(el.classList.contains('error')) {
            errorCount++;
        }
    })
    if(errorCount === 0) {
        popup.classList.add('show-popup')
    }
    console.log(errorCount)
}
// send btn
sendBtn.addEventListener('click', e => {
    e.preventDefault();
    // wywoływanie funkcji
    checkForm([username, pass, pass2, email])
    checkLength(username, 3)
    checkLength(pass, 8)
    // jeśli chcemy zmienić długość znaków wystarczy zmienić liczbę w checkLength   
    checkPassword(pass, pass2)
    checkMail(email)
    checkErrors();
    
})
// clearBTN
clearBtn.addEventListener('click', (e) => {
	// e.prevenDefault odpowiada za to by strona się nie odświeżała
	e.preventDefault();
    [username, pass, pass2, email].forEach((el) => {
        el.value = '';
        clearError(el)
})
	

	// username.value =''
	// pass.value =''
	// pass2.value =''
});
