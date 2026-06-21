export default {
  async fetch() {
    return new Response(
      `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>RapYard</title>
<style>
body{
margin:0;
background:#050505;
color:white;
font-family:Arial,sans-serif;
display:flex;
justify-content:center;
align-items:center;
min-height:100vh;
}
.container{
text-align:center;
max-width:600px;
padding:20px;
}
h1{
font-size:64px;
margin-bottom:10px;
}
p{
opacity:.7;
margin-bottom:30px;
}
input{
width:100%;
padding:16px;
border-radius:12px;
border:none;
margin-bottom:15px;
}
button{
width:100%;
padding:16px;
border:none;
border-radius:12px;
font-weight:bold;
cursor:pointer;
}
</style>
</head>
<body>
<div class="container">
<h1>RAPYARD</h1>
<p>Join the waitlist for early access.</p>
<form>
<input type="email" placeholder="Enter your email">
<button>Join Waitlist</button>
</form>
</div>
</body>
</html>`,
      {
        headers: {
          "content-type": "text/html"
        }
      }
    );
  }
};