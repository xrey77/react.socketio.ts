// import * as moment from 'moment';
import moment from "moment"

export function formatMessage (username: any, text: any) {
    return {
        username,
        text,
        time: moment().format('h:mm:ss a')
    }
}