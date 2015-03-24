(function() {
	'use strict';

	describe('Service: betDataProvider', function() {
		var service, constants;

		beforeEach(module('bettingHost'));

		beforeEach(inject(function(_betDataProvider_, _Constants_) {
			service = _betDataProvider_;
			constants = _Constants_;
		}));

		describe('#getPayout', function() {
			it('should get dividend from `WIN` and selection `2`', function() {
				expect(service.getPayout(constants.TYPE_WIN, 2)).toBe(2.61);
			});

			it('should get dividend from `PLACE` and selection `2`', function() {
				expect(service.getPayout(constants.TYPE_PLACE, 2)).toBe(1.06);
			});

			it('should get dividend from `PLACE` and selection `3`', function() {
				expect(service.getPayout(constants.TYPE_PLACE, 3)).toBe(1.27);
			});

			it('should get dividend from `PLACE` and selection `1`', function() {
				expect(service.getPayout(constants.TYPE_PLACE, 1)).toBe(2.13);
			});

			it('should get dividend from `EXACTA` and selection `2, 3`', function() {
				expect(service.getPayout(constants.TYPE_EXACTA, [2, 3])).toBe(2.43);
			});
		});

		describe('#resolveOutput', function() {
			it('should get dividend from `WIN` and selection `2`', function() {
				service.resolveOutput();
				console.log(service.output);
				//expect(service.getPayout(constants.TYPE_WIN, 2)).toBe(2.61);
			});
		});
	});
})();


