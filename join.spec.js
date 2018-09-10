const expect = require('chai').expect;
const uuidv4 = require('uuid/v4');
const join = require('./join');

describe('join', () => {
  it('should accept no arguments', () => {
    const result = join();

    expect(result).to.be.instanceof(Array);
    expect(result.length).to.be.equal(0);
  });

  it('should accept single empty array', () => {
    const result = join([]);

    expect(result).to.be.instanceof(Array);
    expect(result.length).to.be.equal(0);
  });

  it('should accept single non-empty array', () => {
    const result = join([
      {
        id: uuidv4(),
        lastModified: new Date('2018-08-08T07:00:00.000Z')
      }
    ]);

    expect(result).to.be.instanceof(Array);
    expect(result.length).to.be.equal(1);
  });

  it('should accept multiple arrays', () => {
    const result = join(
      [],
      [
        {
          id: uuidv4(),
          lastModified: new Date('2018-08-08T07:00:00.000Z')
        }
      ],
      [
        {
          id: uuidv4(),
          lastModified: new Date('2018-08-09T07:00:00.000Z')
        },
        {
          id: uuidv4(),
          lastModified: new Date('2018-08-10T07:00:00.000Z')
        }
      ]
    );

    expect(result).to.be.instanceof(Array);
    expect(result.length).to.be.equal(3);
  });

  it('should filter out duplicates', () => {
    const duplicate = {
      id: uuidv4(),
      lastModified: new Date('2018-08-08T07:00:00.000Z')
    };

    const result = join(
      [
        Object.assign({}, duplicate)
      ],
      [
        {
          lastModified: new Date('2018-08-09T07:00:00.000Z')
        },
        Object.assign({}, duplicate)
      ],
      [
        {
          lastModified: new Date('2018-08-10T07:00:00.000Z')
        },
        Object.assign({}, duplicate),
        {
          lastModified: new Date('2018-08-11T07:00:00.000Z')
        },
        Object.assign({}, duplicate)
      ]
    );

    expect(result).to.be.instanceof(Array);
    expect(result.length).to.be.equal(4);
  });

  it('should sort by lastModified property in ascending order', () => {
    const first = {
      id: uuidv4(),
      lastModified: new Date('2018-08-08T07:00:00.000Z')
    };
    const second = {
      id: uuidv4(),
      lastModified: new Date('2018-08-09T07:00:00.000Z')
    };
    const third = {
      id: uuidv4(),
      lastModified: new Date('2018-08-10T07:00:00.000Z')
    };
    const fourth = {
      id: uuidv4(),
      lastModified: new Date('2018-08-11T07:00:00.000Z')
    };
    const result = join(
      [],
      [
        Object.assign({}, third),
        Object.assign({}, first),
        Object.assign({}, fourth),
        Object.assign({}, first)
      ],
      [
        Object.assign({}, first)
      ],
      [
        Object.assign({}, second),
        Object.assign({}, first)
      ]
    );

    expect(result).to.be.instanceof(Array);
    expect(result.length).to.be.equal(4);
    expect(result[0].lastModified.toISOString()).to.be.equal(first.lastModified.toISOString());
    expect(result[1].lastModified.toISOString()).to.be.equal(second.lastModified.toISOString());
    expect(result[2].lastModified.toISOString()).to.be.equal(third.lastModified.toISOString());
    expect(result[3].lastModified.toISOString()).to.be.equal(fourth.lastModified.toISOString());
  });
});
