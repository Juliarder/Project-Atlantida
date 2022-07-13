// Кнопка меню при маленьком экране которая разворачивается
window.onload = function menuF() {
    var menu = document.getElementById("myTopnav");
    menu.onclick= function myFunction() {

    

    if(menu.className === "topnav") {
        menu.className += " responsive";
    } else {
        menu.className = "topnav";
    }
}
}
// Форма отправки и валидация
"use strict"
    // Валидация (Проверка обязательных полей на заполненость)
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById("form");
    form.addEventListener("submit", formSend);


    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);
        formData.append("image", formImage.files[0]);

        if (error === 0) {
            form.classList.add('_sending');
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });
            if (response.ok){
                let result = await response.json();
                alert(result.message);
                formPreview.innerHTML = '';
                form.reset();
            }else {
                alert("Ошибка");
            }

        }else {
            alert("Заполните все обязательные поля*");
        }
    }
    function formValidate(_form) {
        let error = 0;
        let formReq = document.querySelectorAll("._req");

        for (let index = 0; index < formReq.length; index++){
            const input = formReq[index];
            formRemoveError(input);

            if(input.classList.contains("_email")){
                if(emailTest(input)){
                    formAddError(input);
                    error++;
                }
            }else if(input.getAttribute("type") === "checkbox" && input.checked === false){
                formAddError(input);
                error++;
            }else{
                if (input.value === ""){
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }
    function formAddError(input) {
        input.parentElement.classList.add("_error");
        input.classList.add("_error");
    }
    function formRemoveError(input) {
        input.parentElement.classList.remove("_error");
        input.classList.remove("_error");
    }
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    // превью картинки которую загружаем
        // получаем инпут file в переменную
        const formImage = document.getElementById("formImage");
    //получаем вид для превью в переменную 
    const formPreview = document.getElementById("formPreview");
    // Проверяем изменения в файле
    formImage.addEventListener("change", () => {
        uploadFile(formImage.files[0]);
    });
    function uploadFile(file) {
        // Проверяем тип файла
        if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)){
            alert("Разрешены только изображения.");
            formImage.value = "";
            return;
        }
        // Устанавливаем максимальный размер загружаемого файла, а так-же проверяем его.
        if (file.size > 2 * 1024 * 1024) {
            alert("Файл должен быть менее 2 МБ");
            return;
        }

        // Отображение файла
        var reader = new FileReader();
        reader.onload = function (e) {
            formPreview.innerHTML = '<img src = "${e.target.result}" alt = "Фото"></img>';
        };
        reader.onerror = function (e){
            alert("Ошибка");
        };
        reader.readAsDataURL(file);
    }
});