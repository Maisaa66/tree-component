/** *********************************************************
 * This software and related documentation are proprietary
 * and confidential to Siemens.
 * Copyright 2022 Siemens.
 ********************************************************** */

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export default class TimeUtils {

  static getCurrentTimestampUtc() {
    return dayjs().utc().toISOString()
  }

}