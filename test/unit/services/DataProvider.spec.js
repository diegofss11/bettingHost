(function() {
	'use strict';

	fdescribe('Service: dataProvider', function() {
		var dataProvider, productType;

		beforeEach(module('bettingHost'));

		beforeEach(inject(function(_dataProvider_, _ProductType_) {
			dataProvider = _dataProvider_;
			productType = _ProductType_;
		}));

		describe('#getWinPool', function() {
			it('should get pool by WIN product', function() {
				expect(dataProvider.getWinPool(productType.WIN)).toBe(338);
			});

			it('should get pool by PLACE product', function() {
				expect(dataProvider.getWinPool(productType.PLACE)).toBe(646);
			});

			it('should get pool by EXACTA product', function() {
				expect(dataProvider.getWinPool(productType.EXACTA)).toBe(611);
			});
		})
	});
})();


