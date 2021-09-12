import app from './App'
const port = process.env.PORT || 3000;
app.listen(port, (err: any) => {
  if (err) {
    return console.log(err)
  }
  console.log(`Server is listening on ${port}`)
})