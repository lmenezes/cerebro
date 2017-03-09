describe('filter', function() {

  beforeEach(module('cerebro'));

  describe('bytes', function() {

    it('should convert a number to a byte representation',
      inject(function(bytesFilter) {
        expect(bytesFilter(1)).toBe('1.00b');
        expect(bytesFilter(12)).toBe('12.00b');
        expect(bytesFilter(123)).toBe('123.00b');
        expect(bytesFilter(1234)).toBe('1.21KB');
        expect(bytesFilter(12345)).toBe('12.06KB');
        expect(bytesFilter(123456)).toBe('120.56KB');
        expect(bytesFilter(1234567)).toBe('1.18MB');
        expect(bytesFilter(12345678)).toBe('11.77MB');
        expect(bytesFilter(123456789)).toBe('117.74MB');
        expect(bytesFilter(1234567890)).toBe('1.15GB');
        expect(bytesFilter(1234567890000000)).toBe('1.10PB');
      }));
  });
});
