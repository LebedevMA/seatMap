namespace SeatMap {
    export type Seat = {
        seatColumn: string,
        noSeat?: boolean,
        leftSide?: boolean,
        rightSide?: boolean,
        extraSpace?: boolean,
    };

    export type Row = {
        seats: { [seatColumn: string]: Seat },
        firstRow: boolean,
        exitRow: boolean,
        rowNumber: number
    };

    /**
     * Class representing a seat map of a plane
     */
    export class SeatMap {
        /**
         * Rows of seats
         * @public
         * @constant
         */
        readonly rows: Row[];
        /**
         * Range of rows over wings
         * @public
         * @constant
         */
        readonly wings: { fromRow: number, toRow: number };
        /**
         * Create empty seat map
         */
        constructor(){
            this.rows = [];
            this.wings = { fromRow: -1, toRow: -1 };
        }
        /**
         * Add a seat row
         * @param {number} rowNumber 
         */
        addRow(rowNumber: number): void {
            this.rows[rowNumber] = {
                seats: {},
                firstRow: false,
                exitRow: false,
                rowNumber
            };
        }
        /**
         * Add a seat to seat row
         * @param {number} rowNumber Seat row number
         * @param {Seat} seatData Seat parameters
         */
        addSeat(rowNumber: number, seatData: Seat): void {
            if (!this.rows[rowNumber]) return;
            this.rows[rowNumber].seats[seatData.seatColumn] = seatData;
        }
        /**
         * Set a first row flag
         * @param {number} rowNumber Seat row number
         */
        setRowFirst(rowNumber: number): void {
            this.rows[rowNumber].firstRow = true;
        }
        /**
         * Set a exit row flag
         * @param {number} rowNumber Seat row number
         */
        setRowExit(rowNumber: number): void {
            this.rows[rowNumber].exitRow = true;
        }
        /**
         * Set a range of rows over wings
         * @param {number} fromRow Seat row range start
         * @param {number} toRow Seat row range end
         */
        setWings(fromRow: number, toRow: number): void {
            this.wings.fromRow = fromRow;
            this.wings.toRow = toRow;
        }
        /**
         * Check if a row is over wings
         * @param {number} rowNumber Seat row number 
         * @returns {boolean} Row is over wings
         */
        isWingsRow(rowNumber: number): boolean {
            return (rowNumber >= this.wings.fromRow && rowNumber <= this.wings.toRow);
        }
    }
}

export default SeatMap;
