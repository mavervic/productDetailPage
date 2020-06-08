let i = 10;
function timeCount() {
  self.postMessage(i);
  if (i <= 0) {
    return;
  }
  i--;
  setTimeout("timeCount()", 1000);
}

timeCount();
