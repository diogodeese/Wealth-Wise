type Observer = (error: unknown) => void

class ErrorObserver {
  private static observers: Observer[] = []

  static subscribe(observer: Observer): void {
    this.observers.push(observer)
  }

  static notifyAll(error: unknown): void {
    this.observers.forEach((observer) => observer(error))
  }
}

export default ErrorObserver
