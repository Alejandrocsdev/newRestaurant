const bcrypt = require('bcrypt')

async function a() {
  const user = await bcrypt.hash('12345678', 10)
  const alex = await bcrypt.hash('alex5678', 10)
  console.log(user)
  console.log(alex)
}

a()