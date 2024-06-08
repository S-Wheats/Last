var AJAX = {
  call: function (url, params, func, isfd) {
    var callobj = {
      url: url,
      type: "post",
      data: params,
      dataType: "text",
      success: func,
      error: function (xhr, status, error) {
        if (xhr.status == 0) {
          alert("네트워크 접속이 원할하지 않습니다.");
        } else {
          console.log(xhr.responseText);
          alert("에러가 발생하였습니다. 관리자에게 문의해주세요.");
        }
      },
    };
    if (isfd) {
      callobj.processData = false;
      callobj.contentType = false;
    }
    jQuery.ajax(callobj);
  },
}; // end of AJAX

async function login() {
  var id = $("#id").val().trim();
  if (id == "") {
    alert("아이디를 입력해 주세요.");
    $("#id").focus();
    return;
  }

  var ps = $("#ps").val().trim();
  if (ps == "") {
    alert("패스워드를 입력해 주세요.");
    $("#ps").focus();
    return;
  }

  const response = await fetch("/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: id, password: ps }),
  });

  const data = await response.json();
  console.log("Response Data:", data); // 서버 응답 데이터를 출력

  if (response.ok) {
    alert(data.message);
    // 사용자 이름과 이메일을 로컬 스토리지에 저장
    localStorage.setItem("userName", data.name);
    localStorage.setItem("userEmail", id);
    console.log("Saved userName:", data.name); // 콘솔 로그 추가
    console.log("Saved userEmail:", id); // 콘솔 로그 추가
    window.location.href = "./mainPage.html";
  } else {
    alert(data.message);
  }
}

var Page = {
  init: function (cbfunc, url) {
    AJAX.call("jsp/session.jsp", null, function (data) {
      var uid = data.trim();
      if (uid == "null") {
        alert("로그인이 필요한 서비스 입니다.");
        window.location.href = "./login.html";
      } else {
        var param = url == null ? null : SessionStore.get(url);
        if (cbfunc != null) cbfunc(uid, param);
      }
    });
  },

  go: function (url, param) {
    SessionStore.set(url, param);
    window.location.href = url;
  },
};

var SessionStore = {
  set: function (name, val) {
    sessionStorage.setItem(name, JSON.stringify(val));
  },
  get: function (name) {
    var str = sessionStorage.getItem(name);
    return str == null || str == "null" ? null : JSON.parse(str);
  },
  remove: function (name) {
    sessionStorage.removeItem(name);
  },
};

var DataCache = {
  set: function (name, data) {
    var obj = { ts: Date.now(), data: data };
    SessionStore.set(name, obj);
  },
  get: function (name) {
    var obj = SessionStore.get(name);
    if (obj == null) {
      return null;
    }
    var diff = (Date.now() - obj.ts) / 60000;
    if (diff > 10) {
      SessionStore.remove(name);
      return null;
    }
    return obj.data;
  },
  remove: function (name) {
    SessionStore.remove(name);
  },
};
