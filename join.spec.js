var expect = require('chai').expect;
var join = require('./join');

describe('join', function() {
  it('should accept no arguments', function() {
    var result = join();

    expect(result).to.be.instanceof(Array);
    expect(result.length).to.be.equal(0);
  });

  it('should accept single empty array', function() {
    var result = join([]);

    expect(result).to.be.instanceof(Array);
    expect(result.length).to.be.equal(0);
  });

  it('should accept single non-empty array', function() {
    var result = join([
      {
        lastModified: new Date('2018-08-08T07:00:00.000Z')
      }
    ]);

    expect(result).to.be.instanceof(Array);
    expect(result.length).to.be.equal(1);
  });

  it('should accept multiple arrays', function() {
    var result = join(
      [],
      [
        {
          lastModified: new Date('2018-08-08T07:00:00.000Z')
        }
      ],
      [
        {
          lastModified: new Date('2018-08-09T07:00:00.000Z')
        },
        {
          lastModified: new Date('2018-08-10T07:00:00.000Z')
        }
      ]
    );

    expect(result).to.be.instanceof(Array);
    expect(result.length).to.be.equal(3);
  });

  it('should filter out duplicates', function() {
    var duplicate = '2018-08-08T07:00:00.000Z';
    var result = join(
      [
        {
          lastModified: new Date(duplicate)
        }
      ],
      [
        {
          lastModified: new Date('2018-08-09T07:00:00.000Z')
        },
        {
          lastModified: new Date(duplicate)
        }
      ],
      [
        {
          lastModified: new Date('2018-08-10T07:00:00.000Z')
        },
        {
          lastModified: new Date(duplicate)
        },
        {
          lastModified: new Date('2018-08-11T07:00:00.000Z')
        },
        {
          lastModified: new Date(duplicate)
        }
      ]
    );

    expect(result).to.be.instanceof(Array);
    expect(result.length).to.be.equal(4);
  });

  it('should sort by lastModified property in ascending order', function() {
    var duplicate = '2018-08-08T07:00:00.000Z';
    var first = duplicate;
    var second = '2018-08-09T07:00:00.000Z';
    var third = '2018-08-10T07:00:00.000Z';
    var fourth = '2018-08-11T07:00:00.000Z';
    var result = join(
      [],
      [
        {
          lastModified: new Date(third)
        },
        {
          lastModified: new Date(duplicate)
        },
        {
          lastModified: new Date(fourth)
        },
        {
          lastModified: new Date(duplicate)
        }
      ],
      [
        {
          lastModified: new Date(duplicate)
        }
      ],
      [
        {
          lastModified: new Date(second)
        },
        {
          lastModified: new Date(duplicate)
        }
      ]
    );

    expect(result).to.be.instanceof(Array);
    expect(result.length).to.be.equal(4);
    expect(result[0].lastModified.toISOString()).to.be.equal(first);
    expect(result[1].lastModified.toISOString()).to.be.equal(second);
    expect(result[2].lastModified.toISOString()).to.be.equal(third);
    expect(result[3].lastModified.toISOString()).to.be.equal(fourth);
  });
});
