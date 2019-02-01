export class Messaging {
  private _eventSubjects: Map<EventName, Subject<any>> = new Map();

  constructor() {}

  public on<K extends EventName, T extends Event>(...eventNames: Array<K>): Observable<T extends IMessageBaseDiscriminator<K> ? T : never> {
    const obs$ = eventNames.map(name => {
      this.createEventSubject(name);
      return from(this._eventSubjects.get(name));
    });
    return merge(...obs$);
  }

  public once(s: EventName): Observable<Event> {
    this.createEventSubject(s);
    return from(this._eventSubjects.get(s)).pipe(take(1));
  }

  public publish(v: Event): void {
    const subject = this._eventSubjects.get(v.name);
    if (subject) {
      subject.next(v);
    }
  }

  private createEventSubject(s: EventName) {
    if (!this._eventSubjects.has(s)) {
      const eventSubject$ = new Subject<Event>();
      this._eventSubjects.set(s, eventSubject$);
    }
  }
}
