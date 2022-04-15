const elUserList = document.querySelector(".user__list");
const elPostList = document.querySelector(".post__list");
const elCommentList = document.querySelector(".comment__list");
const elUserTemplate = document.querySelector(".user__template").content;
const elPostTemplate = document.querySelector(".post__template").content;
const elCommentTemplate = document.querySelector(".comment__template").content;




function renderUsers (array , element){

  const userFragment = document.createDocumentFragment()

  array.forEach(item => {

    const clonedUserTemplate = elUserTemplate.cloneNode(true);
    clonedUserTemplate.querySelector(".user__item").dataset.dataId = item.id;
    clonedUserTemplate.querySelector(".user__id").textContent = item.id;
    clonedUserTemplate.querySelector(".user__name").textContent = item.name;
    clonedUserTemplate.querySelector(".user__nickname").textContent = item.username;
    clonedUserTemplate.querySelector(".user__street").textContent = item.address.street;
    clonedUserTemplate.querySelector(".user__suite").textContent = item.address.suite;
    clonedUserTemplate.querySelector(".user__city").textContent = item.address.city;
    clonedUserTemplate.querySelector(".user__zipcode").textContent = item.address.zipcode;
    clonedUserTemplate.querySelector(".user__geo").href = "https://www.google.com/maps/place/" + item.address.geo.lat + "," + item.address.geo.lng;
    clonedUserTemplate.querySelector(".user__mail").textContent = item.email;
    clonedUserTemplate.querySelector(".user__mail").href = "mailto:" + item.email;
    clonedUserTemplate.querySelector(".user__phone").textContent = item.phone;
    clonedUserTemplate.querySelector(".user__phone").href = "tel:" + item.phone;
    clonedUserTemplate.querySelector(".user__website").textContent = item.website;
    clonedUserTemplate.querySelector(".user__website").href = item.website;
    clonedUserTemplate.querySelector(".company__name").textContent = item.company.name;
    clonedUserTemplate.querySelector(".company__catchPhrase").textContent = item.company.catchPhrase;
    clonedUserTemplate.querySelector(".company__bs").textContent = item.company.bs;

    userFragment.appendChild(clonedUserTemplate)
  });

  element.appendChild(userFragment);
}

async function getUsers() {

  const res = await fetch("https://jsonplaceholder.typicode.com/users")

  const data = await res.json();

  renderUsers(data , elUserList);
}

elUserList.addEventListener("click" , evt =>{


  if(evt.target.matches(".user__item")){

    let itemId = evt.target.dataset.dataId;


    async function getPost(){
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${itemId}`)
      const data = await res.json();



      function renderPosts(array , element) {

        element.innerHTML = "";
        const postFragment = document.createDocumentFragment();

        array.forEach(item => {
          clonedPostTemplate = elPostTemplate.cloneNode(true);
          clonedPostTemplate.querySelector(".post__item").dataset.dataId = item.id
          clonedPostTemplate.querySelector(".post__title").textContent = item.title;
          clonedPostTemplate.querySelector(".post__text").textContent = item.body;

          postFragment.appendChild(clonedPostTemplate);
        })

        element.appendChild(postFragment);
      }
      renderPosts(data, elPostList);
    }
    getPost()
  }
})

elPostList.addEventListener("click" , evt =>{

  let liId = evt.target.dataset.dataId;

  console.log(liId);

  if(evt.target.matches(".post__item")){
    async function getComment() {
      const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${liId}`);
      const data = await res.json();

      function renderComment(array , element) {
        element.innerHTML = ""
        const commentFragment = document.createDocumentFragment()
        array.forEach(item =>{
          let clonedCommmentTemplate = elCommentTemplate.cloneNode(true);
          clonedCommmentTemplate.querySelector(".comment__name").textContent = item.name;
          clonedCommmentTemplate.querySelector(".comment__mail").href = "mailto:" + item.email;
          clonedCommmentTemplate.querySelector(".comment__text").textContent = item.body;
          commentFragment.appendChild(clonedCommmentTemplate);
        })
        element.appendChild(commentFragment);
      }
      renderComment(data , elCommentList);
    };
    getComment()
  }
});

getUsers()
