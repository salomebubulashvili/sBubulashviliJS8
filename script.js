'use strict'

const div = document.getElementById('api-users');
const ulElements = document.getElementById('ul-elements');
const loadMoreBtn = document.getElementById('load-more');
const loadPrevBtn = document.getElementById('load-previous');
let currentPage = 1;
let totalPages;


function aboutUsers (page) {
    fetch ('https://reqres.in/api/users?page=' + page, {
        method: 'GET',
    })
    .then(function (response) {
        if (!response.ok) {
            throw response.status;
        }
        return response.json();
    })
    .then ( function (responseData) {
        const fragment = document.createDocumentFragment();
        responseData.data.forEach((element) => {
            const liElement = document.createElement('li');
            liElement.textContent = `${element.first_name} ${element.last_name}`;
            const userImg = document.createElement('img');
            userImg.setAttribute('src', element.avatar);
            userImg.setAttribute('alt', 'face');
            liElement.appendChild(userImg);
            fragment.appendChild(liElement);

        });

        ulElements.innerHTML = '';
        ulElements.appendChild(fragment);
        totalPages = responsedata.total_pages;
        if(currentPage === totalPages) {
            loadMoreBtn.disabled = true;
        }

        if (currentPage === 1) {
            loadPrevBtn.disabled = true;
        } else {
            loadPrevBtn.disabled = false;
        }

        if (currentPage === 2) {
            loadMoreBtn.disabled = true;
        } else {
            loadMoreBtn.disabled = false;
        }
    })

    .catch (function (error) {
        if (error == 404) {
            const errorText = document.createElement ('p');
            errorText.innerText = 'Page Not Found';
            div.appendChild(errorText);
        } else if (error == 500) {
            const errorText = document.createElement('p');
            errorText.innerText = 'Server Eroor';
            div.appendChild(errorText);
        }
    });

}

loadPrevBtn.addEventListener('click', function () {
    if (currentPage === 1) {
        return;
    }
    currentPage = currentPage - 1;
    aboutUsers(currentPage);
});

loadMoreBtn.addEventListener('click', function () {
    if (currentPage === 2) {
        return;
    }
    currentPage = currentPage + 1;
    aboutUsers(currentPage);
});

aboutUsers(currentPage);