import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

// 扩展 dayjs 的 duration 功能
dayjs.extend(duration);

/**
 * 格式化秒数为 MM:SS 格式
 * @param seconds 秒数
 * @returns 格式化后的时间字符串 (MM:SS)
 */
export function formatTime(seconds: number): string {
  const dur = dayjs.duration(seconds, "seconds");
  const minutes = dur.minutes();
  const secs = dur.seconds();
  return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

/**
 * 将分钟转换为秒数
 * @param minutes 分钟数
 * @returns 秒数
 */
export function getDuration(minutes: number): number {
  return dayjs.duration(minutes, "minutes").asSeconds();
}

/**
 * 获取当前时间戳
 * @returns 当前时间戳
 */
export function getCurrentTimestamp(): number {
  return dayjs().valueOf();
}

/**
 * 格式化日期时间为 YYYY-MM-DD HH:mm:ss 格式
 * @param timestamp 时间戳
 * @returns 格式化后的日期时间字符串
 */
export function formatDateTime(timestamp: number): string {
  return dayjs(timestamp).format("YYYY-MM-DD HH:mm:ss");
}

/**
 * 格式化日期为 YYYY-MM-DD 格式
 * @param timestamp 时间戳
 * @returns 格式化后的日期字符串
 */
export function formatDate(timestamp: number): string {
  return dayjs(timestamp).format("YYYY-MM-DD");
}

/**
 * 获取两个时间戳之间的持续时间（秒）
 * @param start 开始时间戳
 * @param end 结束时间戳
 * @returns 持续时间（秒）
 */
export function getDurationBetween(start: number, end: number): number {
  return dayjs.duration(end - start, "milliseconds").asSeconds();
}