interface Res {
  data: {
    [key: string]: any
  }
}

namespace axios {
  export function post(url: string, config: object): Promise<Res> {
    return new Promise(resolve => {
      setTimeout(() => {
        let res: Res = { data: {} }
        if (url === '/login') { res.data.user_id = 111 }
        else { res.data.role = 'admin' }
        resolve(res)
      })
    })
  }
}

interface Info {
  user_name: string,
  password: string
}
async function loginReq({ user_name, password }: Info) {
  try {
    const res = await axios.post('/login', { 
      data: {
        user_name,
        password
      }
     })
     return res
  } catch (e: any) {
    throw new Error(e)
  }
}

loginReq({ user_name: 'lison', password: '123' }).then(res => { console.log(res) })
console.log('---------------------------------------------------------------')

interface ObjProp {
  name?: string
  age?: string
}
let objProp = { gender: 'man' }
function getProp(obj: ObjProp) {
  console.log(obj)
} 
// getProp(objProp)
// Type '{ gender: string; }' has no properties in common with type 'ObjProp'
getProp(objProp as ObjProp)
console.log('---------------------------------------------------------------')

function getExcludeProp<T extends { props: string }>(obj: T) {
  const {props, ...rest} = obj
  return rest
}
const objInfo = {
  props: 'something',
  name: 'lison',
  age: 18
}
console.log(getExcludeProp(objInfo))

