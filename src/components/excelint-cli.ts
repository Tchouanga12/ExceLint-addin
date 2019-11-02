// Process Excel files (input from stdin as JSON) with ExceLint.

let fs = require("fs");
import { Colorize } from './colorize';

let inp = null;
const useExample = false;

if (useExample) {
    inp = {
	usedRangeAddress: 'Sheet1!E12:E21',
	formulas: [
	    [ '=D12' ], [ '=D13' ],
	    [ '=D14' ], [ '=D15' ],
	    [ '=D16' ], [ '=D17' ],
	    [ '=D18' ], [ '=D19' ],
	    [ '=D20' ], [ '=C21' ]
	],
	values: [
	    [ '0' ], [ '0' ],
	    [ '0' ], [ '0' ],
	    [ '0' ], [ '0' ],
	    [ '0' ], [ '0' ],
	    [ '0' ], [ '0' ]
	]
    };
} else {
    // Read from stdin.
    let content = fs.readFileSync("/dev/stdin");
    inp = JSON.parse(content);
}
   

let [suspicious_cells, grouped_formulas, grouped_data, proposed_fixes]
    = Colorize.process_suspicious(inp.usedRangeAddress, inp.formulas, inp.values);

let out = { "suspiciousCells" : suspicious_cells,
	    "groupedFormulas" : grouped_formulas,
	    "groupedData" : grouped_data,
	    "proposedFixes" : proposed_fixes
	  }

console.log(JSON.stringify(out, null, "\t"));