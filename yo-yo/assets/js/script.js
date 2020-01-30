document.addEventListener('DOMContentLoaded', function() {
  const code = document.getElementById('code');
  let hash = window.location.search;
  hash = hash.split('=');
  if(window.location.search){
    code.innerText = hash[1]
  }
});
