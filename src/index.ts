import app from './App'
const port = process.env.PORT || 8080;
app.listen(port, (err: any) => {
  if (err) {
    return console.log(err)
  }
  console.log(`Server is listening on ${port}`)
})