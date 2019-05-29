import SeatMap from './seatMap';

/**
 * Generate a string visualization for a seat
 * @param {SeatMap.Seat} seat Seat to be displayed
 * @returns {string} Seat visualization
 */
function displaySeat(seat: SeatMap.Seat): string {
    if (seat.noSeat) return '   ';
    if (seat.extraSpace) return '[^]';
    return '[ ]';
}

/**
 * Display symbols of seats columns
 * @param {boolean} shortRow Row contains 4 seats
 * @param {string} separator Space separating left and right side
 */
function displaySymbols(shortRow: boolean, separator: string): void {
    let symbolString: string = `          A ${shortRow?'':' B '} C ${separator} D ${shortRow?'':' E '} F  `;
    
    console.log(symbolString);
}

/**
 * Display seat map visualization
 * @param {SeatMap.SeatMap} seatMap Seat map to be displayed
 */
export function display(seatMap: SeatMap.SeatMap): void {
    seatMap.rows.forEach((row: SeatMap.Row): void => {
        let rowString: string = ' ';

        for (const symbol of ['A', 'B', 'C']) {
            if (!row.seats[symbol]) continue;
            rowString += displaySeat(row.seats[symbol]);
        }

        const separator: string = row.seats.B ? '   ' : '         ';
        rowString += separator;

        for (const symbol of ['D', 'E', 'F']) {
            if (!row.seats[symbol]) continue;
            rowString += displaySeat(row.seats[symbol]);
        }

        if (row.firstRow || row.exitRow) displaySymbols(!row.seats.B, separator);

        rowString = seatMap.isWingsRow(row.rowNumber) ? `-${rowString}-` : ` ${rowString} `;

        const rowNumberPrefix: string = row.rowNumber.toString();
        rowString = rowNumberPrefix.concat(' '.repeat(7 - rowNumberPrefix.length), rowString);
        console.log(rowString);
    });
}
