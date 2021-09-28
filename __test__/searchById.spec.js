const app = require('../src/index');
const supertest = require('supertest');

const request = supertest(app);

describe('cache function', () => {
  it('it should returns a seriesbyId', async () => {
    const input1 = '614e2d1eb17a43401676acfb';
    const input2 = '614dcbb4719e9f1a7febb96c';

    const output = {
      genres: ['Sitcom', 'television comedy'],
      _id: '614e2d1eb17a43401676acfb',
      title: 'The big bang theory 2',
      urlImage: 'url 2',
      category: 'comededy',
      createdby: "Chuck Lorre's",
      createdAt: '2021-09-24T19:55:10.207Z',
      updatedAt: '2021-09-24T19:55:10.207Z',
    };

    const output2 = {
      genres: [
        'Dystopia',
        'Science fiction',
        'Thriller',
        'Anthology series',
        'Drama',
        'Satire',
        'Psychological thriller',
        'Speculative fiction',
      ],
      _id: '614dcbb4719e9f1a7febb96c',
      title: 'Black mirror',
      urlImage: 'url b',
      category: 'Sci-fi shows',
      createdby: 'Charlie Brooker',
      createdAt: '2021-09-24T12:59:32.806Z',
      updatedAt: '2021-09-24T12:59:32.806Z',
    };

    let response = await request.get(`/api/v1/series/${input1}`).send();
    let results = response.body;

    expect(results).toEqual(output);

    response = await request.get(`/api/v1/series/${input2}`).send();
    results = response.body;

    expect(results).toEqual(output2);
  });

  it('should returns a error message', async () => {
    //test with id that does not exist
    const input1 = '614e2d1eb17a43401676acfz';

    const output = { message: 'Serie not founded' };

    const response = await request.get(`/api/v1/series/${input1}`).send();
    const results = response.body;

    expect(results).toEqual(output);
  });
});
