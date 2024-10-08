const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file');
      resolve(data);
    });
  }); 
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) return reject('Could not find file');
      resolve('success');
    });
  });
};

// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed : ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);

//     return writeFilePro('dog-img.txt', res.body.message);
//   })
//   .then(() => {
//     console.log('Random dog image saved to file! ');
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

const getDogPic = async () => {
  const data = await readFilePro(`${__dirname}/dog.txt`);
  console.log(`Breed : ${data}`);

  const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  console.log(res.body.message); 

  await writeFilePro('dog-img.txt', res.body.message);
  console.log('return dog image saved to the file ');
}

getDogPic();


console.log("1: Will get dog pic");
getDogPic().then(x=>{
  console.log(x);
  console.log("3: Done gettig the dog pic");
});



