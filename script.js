function addIdea() {
  var title = document.getElementById("ideaTitle").value.trim();
  var desc = document.getElementById("ideaDesc").value.trim();

  if (title === "") {
    alert("Please enter idea title");
    return;
  }

  var ideas = JSON.parse(localStorage.getItem("ideas")) || [];
  ideas.push({
    title: title,
    desc: desc,
    created: new Date().toISOString()
  });

  localStorage.setItem("ideas", JSON.stringify(ideas));
  displayIdeas();

  document.getElementById("ideaTitle").value = "";
  document.getElementById("ideaDesc").value = "";
}

function displayIdeas() {
  var ideas = JSON.parse(localStorage.getItem("ideas")) || [];
  var list = document.getElementById("ideaList");
  if (!list) return;

  list.innerHTML = "";

  if (ideas.length === 0) {
    list.innerHTML = '<div class="no-results">No ideas posted yet.</div>';
    return;
  }

  ideas.forEach(function(i, index) {
    var div = document.createElement("div");
    div.className = "card";
    div.innerHTML =
      "<h3>" + i.title + "</h3>" +
      "<p>" + i.desc + "</p>" +
      "<div class='button-group'>" +
      "<button onclick='editIdea(" + index + ")'>Edit</button>" +
      "<button onclick='deleteIdea(" + index + ")'>Delete</button>" +
      "</div>";
    list.appendChild(div);
  });
}

function deleteIdea(index) {
  var ideas = JSON.parse(localStorage.getItem("ideas")) || [];
  ideas.splice(index, 1);
  localStorage.setItem("ideas", JSON.stringify(ideas));
  displayIdeas();
}

function editIdea(index) {
  var ideas = JSON.parse(localStorage.getItem("ideas")) || [];
  if (!ideas[index]) return;

  document.getElementById("ideaTitle").value = ideas[index].title;
  document.getElementById("ideaDesc").value = ideas[index].desc;
  deleteIdea(index);
}

window.onload = function() {
  displayIdeas();
};

function getId() {
  var params = new URLSearchParams(window.location.search);
  var id = params.get("id");

  // 🔥 முக்கியம் (auto id create)
  if (!id) {
    id = localStorage.getItem("currentId") || Date.now().toString();
    localStorage.setItem("currentId", id);
  }

  return id;
}