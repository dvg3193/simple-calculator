$(function() {
	
	$(".complect-title i").click(function() {
		if ($(this).parent().parent().next().is(":visible")) {
			$(this).parent().parent().next().slideToggle();
			$(this).parent().parent().removeClass("show-complect");
			$(this).removeClass("fa-angle-down").addClass("fa-angle-up");
		} else {
			$(this).parent().parent().next().slideToggle();
			$(this).parent().parent().addClass("show-complect");
			$(this).removeClass("fa-angle-up").addClass("fa-angle-down");
		}
	});

	$(".complect-title").addClass("show-complect");

	var quantity = 0;
	$(".item-toggle span").click(function() {
		quantity = $(this).parent().parent().find(".item-quantity span").text();
		if (!$(this).hasClass("check") && quantity == 0) {
			$(this).addClass("check");
			quantity++;
			$(this).parent().parent().find(".item-quantity span").text(quantity);
			calculate($(this).parent().parent().find(".item-price span").text(), quantity , 1);
		} else {
			calculate($(this).parent().parent().find(".item-price span").text(), quantity, -2);
			quantity = 0;
			$(this).parent().parent().find(".item-quantity span").text(quantity);
			$(this).removeClass("check");
		}
		
	});

	$(".item-arrows .more").click(function() {
		quantity = $(this).parent().parent().find(".item-quantity span").text();
		if (!$(this).parent().next().find("span").hasClass("check")) {
			$(this).parent().next().find("span").addClass("check");
		}
		quantity++;

		$(this).parent().parent().find(".item-quantity span").text(quantity);
		calculate($(this).parent().parent().find(".item-price span").text(), quantity, 1);
	});

	$(".item-arrows .less").click(function() {
		// if ($(this).parent().parent().siblings().find(".item-quantity span").text() > $(this).parent().parent().find(".item-quantity span").text()) {
		// 	return false;
		// }

		if ($(this).parent().parent().find(".item-quantity span").text() == 0) {
			return false;
		}

		quantity = $(this).parent().parent().find(".item-quantity span").text();
		quantity--;
		
		if (quantity < 1) {

			quantity = 0;
			$(this).parent().next().find("span").removeClass("check");
			$(this).parent().parent().find(".item-quantity span").text(quantity);
			calculate($(this).parent().parent().find(".item-price span").text(), quantity, -1);
			return false;
		} 
		$(this).parent().parent().find(".item-quantity span").text(quantity);
		calculate($(this).parent().parent().find(".item-price span").text(), quantity, -1);
	});

	$(".extra-complect-reset").click(function() {
		quantity = 0;
		$(".item-quantity span").text(0);
		$(".item-toggle span").removeClass("check");
		extra_price = 0;
		common_price = 5799;
		$(".extra-summary-price").text(extra_price);
		$(".common-summary-price").text(common_price);

	});

	var offset = $(".summary").offset();
	var topPadding = 10;
	$(window).scroll(function() {
        if ($(window).scrollTop() > offset.top) {
            $('.summary').stop().animate({marginTop: $(window).scrollTop() - offset.top + topPadding});
        }
        else {
            $('.summary').stop().animate({marginTop: 0});
        }
    });
	
	
});

var extra_price = Number($(".extra-summary-price").text());
var common_price = Number($(".common-summary-price").text());

function calculate(pr, quant, op) {
	if (op == 1) {
		extra_price += Number(pr);
		common_price += Number(pr);
		$(".extra-summary-price").text(extra_price);
		$(".common-summary-price").text(common_price);
	} else if (op == -1) {
		if (extra_price < 0) {
			extra_price = 0;
			return false;
		}
		extra_price -= Number(pr);
		common_price -= Number(pr);
		$(".extra-summary-price").text(extra_price);
		$(".common-summary-price").text(common_price);
	} else if (op == -2) {
		extra_price -= Number(pr) * Number(quant);
		common_price -= Number(pr) * Number(quant);
		$(".extra-summary-price").text(extra_price);
		$(".common-summary-price").text(common_price);
	} 
	
}


$(window).on("load", function() {

})
