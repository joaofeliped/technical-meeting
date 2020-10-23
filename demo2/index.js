const AWS = require('aws-sdk');

const csvtojson = require('csvtojson');
const { cnpj } = require('cpf-cnpj-validator');

const path = require('path');
const fs = require('fs');

const { Transform, Writable, pipeline } = require('stream');
const { promisify } = require('util');

const s3 = new AWS.S3();
const pipelineAsync = promisify(pipeline);

const mapStream = (elapsedBytes) =>
  new Transform({
    objectMode: true,
    transform: (chunk, encoding, cb) => {
      elapsedBytes.count += chunk.length;
      const item = JSON.parse(chunk);

      const data = JSON.stringify({
        name: item.empresa,
        cnpj: cnpj.generate(),
      });

      return cb(null, data);
    },
  });

const processDataStream = (finalData) =>
  new Writable({
    write: async (chunk, encoding, cb) => {
      const data = JSON.parse(chunk);

      console.log(data);

      cb();
    },
  });

async function main() {
  console.log('starting at ', new Date().toISOString());
  console.time('elapsed time');
  const elapsedBytes = {
    count: 0,
  };

  const surveyFile = {
    Bucket: 'technical-meeting',
    Key: 'empresas.csv',
  };

  // const fileStream = fs.createReadStream(
  //   path.resolve(__dirname, 'empresas.csv')
  // );

  const fileStream = s3.getObject(surveyFile).createReadStream();

  await pipelineAsync(
    fileStream,
    csvtojson(),
    mapStream(elapsedBytes),
    processDataStream()
  );

  console.timeEnd('elapsed time');
}

main();
