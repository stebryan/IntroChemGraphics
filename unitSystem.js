class unitSystem {
    constructor(s, u, unit, conversion) {
        // s is pixels per major unit and u is size of major unit (1, 10, 100, ...)
        this.max = floor(500 / s); // max number of major units based on scale
        this.scale = s; // scale in pixels per unit
        this.text = u;  // size of each major tick mark
        this.unit = unit;  // unit label (e.g., mL, fl oz)
        this.conversion = conversion;  // conversion factor for units (e.g., 0.03381 for fluid ounces)
    }

    showTics() {
        fill(0);
        for (let i = 0; i < this.max; i++) {
            let largeTic = 760 - this.scale * (i + 1);
            let largeText = this.text * (i + 1);
            textSize(16);
            textFont(Chewy);
            if (largeTic < 690) {
                rect(295, largeTic, 18, 2); // Draw major ticks
                text(largeText, 275, largeTic + 5); // Display unit labels
            }
            // Draw small ticks for finer granularity
            for (let j = 0; j < 10; j++) {
                let smallTic = largeTic + (j + 1) * this.scale / 10;
                if (smallTic < 690) {
                    rect(305, smallTic, 8, 1); // Draw small ticks
                }
            }
        }

        // Additional small ticks near the bottom if needed
        let check = 760 - this.scale * (this.max);
        if (check > 200) {
            for (let j = 0; j < 10; j++) {
                let smallTic = (760 - this.scale * (this.max + 1)) + (j + 1) * this.scale / 10;
                if (smallTic > 200) {
                    rect(305, smallTic, 8, 1); // Draw extra small ticks
                }
            }
        }
    }

    showAns(amount) {
        textSize(36);
        textFont(Chewy);

        // Apply the conversion factor to the amount
        let convertedAmount = amount * this.conversion;
        let [coefficientString, exponentString] = convertedAmount.toExponential().split('e');
        let exponent = Number(exponentString);
        let formattedAmount;
        if (exponent > 0) {
            formattedAmount = convertedAmount.toFixed(2 - exponent);
        } else {
            formattedAmount = convertedAmount.toFixed(2);
        }

        // Display the converted amount with the unit
        fill(0);
        text(formattedAmount + " " + this.unit, 100, 300);

    }
}
