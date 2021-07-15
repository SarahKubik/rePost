function reblogHandler(event) {
  event.preventDefault();
  console.log(event.target.className)

  if (event.target.classList.contains('reblog')) {
    console.log(`The post id is ${event.target.id}`)
    document.location.replace(`/reblog/${event.target.id}`)
  }
};

document.querySelector('#post-list').addEventListener('click', reblogHandler);