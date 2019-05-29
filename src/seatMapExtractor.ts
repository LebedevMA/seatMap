import * as fs from 'fs';

import SeatMap from './seatMap';

type ExtractedSeat = {
    seatColumn: string,
    seatCharacteristic: string[]
};

type ExtractedRow = {
    seats: ExtractedSeat[],
    seatRow: string
};

type ExtractedCabinClassDetails = {
    numberOfSeats: string,
    classDesignator: string
};

/**
 * Extracts seat map object from buffer
 * @param {Buffer} buffer input buffer
 * @returns {SeatMap.SeatMap} SeatMap object
 */
export function extract(buffer: Buffer): SeatMap.SeatMap {
    const seatMapData: {
        equipmentInformation: {
            cabinClassDetails: ExtractedCabinClassDetails[]
        }
        rows: ExtractedRow[],
        exitRows: number[],
        wings: { fromRow: string, toRow: string }
    } = JSON.parse(buffer.toString());

    const seatMap: SeatMap.SeatMap = new SeatMap.SeatMap();

    const cabinsSeatCount: number[] = seatMapData.equipmentInformation.cabinClassDetails.map(
        (details: ExtractedCabinClassDetails): number => parseInt(details.numberOfSeats)
    );

    let count: number = 0;

    seatMapData.rows.forEach((row: ExtractedRow): void => {
        const rowNumber: number = parseInt(row.seatRow);
        seatMap.addRow(rowNumber);
        if (count === 0) seatMap.setRowFirst(rowNumber);
        count += row.seats.length;
        for (const seat of row.seats) {
            const insertSeat: SeatMap.Seat = {
                seatColumn: seat.seatColumn
            };
            for (const symbol of seat.seatCharacteristic) {
                if (symbol === 'LS') insertSeat.leftSide = true;
                if (symbol === 'RS') insertSeat.leftSide = true;
                if (symbol === 'L') insertSeat.extraSpace = true;
                if (symbol === '8'){
                    insertSeat.noSeat = true;
                    count--;
                }
            }
            seatMap.addSeat(rowNumber, insertSeat);
        }
        if (count >= cabinsSeatCount[0]){
            cabinsSeatCount.shift();
            count = 0;
        }
    });

    seatMapData.exitRows.forEach((exitRow: number): void => seatMap.setRowExit(exitRow));

    seatMap.setWings(parseInt(seatMapData.wings.fromRow), parseInt(seatMapData.wings.toRow));

    return seatMap;
}
