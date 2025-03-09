export default function withInProgress<T>(
  fn: (...args: T[]) => void,
  isInProgress: boolean,
) {
  return (...args: T[]) => {
    if (!isInProgress) {
      console.warn('밴픽 진행 중이 아닙니다.');
      return;
    }

    fn(...args);
  };
}
