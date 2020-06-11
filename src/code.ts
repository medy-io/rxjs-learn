import {Observable, of, Subject, BehaviorSubject, ReplaySubject, AsyncSubject, forkJoin, timer} from "rxjs";
import {from, fromEvent, merge, pipe, interval, combineLatest} from "rxjs";
import { map, pluck, skipUntil, switchMap, delay, startWith, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';


const addItem = (val: any) => {
  var node = document.createElement("li");
  var textnode = document.createTextNode(val);
  node.appendChild(textnode);
  document.getElementById("output").appendChild(node);
};

// let observable = fromEvent(document, "mousemove");

// setTimeout(() => {
//   let subscription = observable.subscribe((x: any) => addItem(x));
// }, 2000);

// Subjuct is an observable and an observer at the same time
// let subject = new ReplaySubject(30, 200);

// subject.subscribe(
//   (data:any) => addItem("Observer 1: " + data),
//   (err:any) => addItem(err),
//   () => addItem("Observer 1 Completed")
// );

// var i = 1;
// var int = setInterval(() => subject.next(i++), 100);

// setTimeout(() => {
//   var observer2 = subject.subscribe(
//     (data: any) => addItem('Observer 2: ' + data)
//   )
// }, 500)


// subject.next("Sent first item");
// subject.next("kjhhkhkhhhuyu");
// subject.next("...Observer 2 is about to subscribe");

// let observer2 = subject.subscribe((data) => addItem("Observer 2: " + data));

// subject.next("Sent second item");
// subject.next("Sent third item");

// observer2.unsubscribe();

// subject.next("Sent final item");

// Types of Subjects:
// Behaviors emit last value

// let observableFromOf = of({
//   firstName: "John",
//   lastName: "Wick",
// });

// let observable = Observable.create((observer: any) => {
//   try {
//     observer.next("1");
//     observer.next("2");
//     setInterval(() => {
//       observer.next("3");
//     }, 2000);
//     // observer.complete();
//   } catch (err) {
//     observer.error(err);
//   }
// }).share();

// console.log(observable);

/**
 * OBSERVER SECTION
 */
// // OBSERVERS ARE JUST A SET OF CALLBACKS...WITH NEXT, ERROR AND COMPLETE METHODS
// let observer1 = observable.subscribe(
//   (v: any) => addItem(v),
//   (error: any) => addItem(error),
//   () => addItem("Completed")
// );

// // let (v: any) => addItem(v) = observable.subscribe(
// //   (v: any) => addItem(v),
// //   (error: any) => addItem(error),
// //   () => addItem("Completed")
// // );

// // child subscription
// // observer1.add(observer2);

// setTimeout(() => {
//   let observable2 = observable.subscribe((v: any) =>
//     addItem("Subscriber 2: " + v)
//   );
//   observer1.unsubscribe();
// }, 1000);




// -------
// SUBJECT
// -------



// ----------------
// BEHAVIOR SUBJECT
// ----------------




// --------------
// REPLAY SUBJECT
// --------------

// let replaySubject = new ReplaySubject(30, 200);

// replaySubject.subscribe(
//   (data:any) => addItem("Observer 1: " + data),
//   (err:any) => addItem(err),
//   () => addItem("Observer 1 Completed")
// );

// var i = 1;
// var int = setInterval(() => replaySubject.next(i++), 100);

// setTimeout(() => {
//   var observer2 = replaySubject.subscribe(
//     (data: any) => addItem('Observer 2: ' + data)
//   )
// }, 500)

// -------------
// ASYNC SUBJECT
// -------------

// Only emits last value and only when the complete() method has been called on the subject


// let asyncSubject = new AsyncSubject();

// asyncSubject.subscribe(
//   (data:any) => addItem("Observer 1: " + data),
//   (err:any) => addItem(err),
//   () => addItem("Observer 1 Completed")
// );

// var i = 1;
// var int = setInterval(() => asyncSubject.next(i++), 1000);

// setTimeout(() => {
//   var observer2 = asyncSubject.subscribe(
//     (data: any) => addItem('Observer 2: ' + data)
//   )
//   // Data is only emitted when subject has been completed
//   asyncSubject.complete();
// }, 4000)


// ---------
// OPERATORS
// ---------

// Methods that you can use on Observables that allow you to change the Observable and return and new Observable
// Static operators     => Used to create observables, "creation operators"
// Instance operators   => Used on observable instances, accounts for most operators



// Merge two Observables

// var observable1 = Observable.create((observer: any) => {
//   observer.next('Hey guys!');
// })

// var observable2 = Observable.create((observer: any) => {
//   observer.next('How is it going!');
// })

// var newObs = merge(observable1, observable2);
// newObs.subscribe((x:any) => addItem(x));



// Map an Observable

// Observable.create((observer: any) => {
//   observer.next('hey guys!');
// }).pipe(
//   map((val:any) => val.toUpperCase())
// )
// .subscribe((x:any) => addItem(x))



// Pluck on an Observable

// from([
//   {
//     firstName: "Frank",
//     lastName: "Schmezel",
//     age: 30,
//     phoneNum: "123-456-7890",
//     address: "123 Qwerty Street",
// },
// {
//   firstName: "Paco",
//   lastName: "Guiterrez",
//   age: 27,
//   phoneNum: "321-654-0987",
//   address: "921 Qwerty Street",
// },
// {
//   firstName: "Great",
//   lastName: "Tacos",
//   age: 1,
//   phoneNum: "000-000-0000",
//   address: "911 Taco Street",
// },
// ])
// .pipe(
//   pluck("firstName")
// )
// .subscribe((x:any) => addItem(x));



// SkipUntil on an Observable

// var observable1 = Observable.create((data:any) => {
//   var i = 1;
//   setInterval(() => {
//     data.next(i++)
//   }, 1000)
// })

// var observable2 = new Subject;

// setTimeout(() => {
//   observable2.next("Hey!")
// }, 3000)

// var newObs = observable1.pipe(skipUntil(observable2));
// newObs.subscribe((x:any) => addItem(x));



// SwitchMap on an Observable

// On every document click the interval observable will reset.
// Useful for HTTP requests, typeaheads, etc.

// const clickObservable = fromEvent(document, 'click');
// const obs = clickObservable
//   .pipe(
//     switchMap((event) => interval(1000))
//   );
// obs.subscribe((x:any) => addItem(x));



// Fork Join on an Observable

// Object/Dictionary inputs
// const forkJoinedObs = forkJoin({
//   foo: of(1, 2, 3, 4),
//   bar: Promise.resolve(8),
//   baz: timer(4000),
// });
// forkJoinedObs.subscribe({
//   next: (value: any) => {
//     addItem(value.foo),
//     addItem(value.bar),
//     addItem(value.baz)
//  },
//   complete: () => addItem('This is how it ends!'),
//  });

// Array inputs
// const forkJoinedObs = forkJoin([
//   of(1, 2, 3, 4),
//   Promise.resolve(8),
//   timer(4000),
// ]);
// forkJoinedObs.subscribe({
//   next: (value: any) => addItem(value),
//   complete: () => addItem('This is how it ends!'),
//  });



// Combine Latest on an Observable

// combine two timer observables

// const firstTimerObs$ = timer(0, 1000); // emit 0, 1, 2... after every second, starting from now
// const secondTimerObs$ = timer(1000, 2000); // emit 0, 1, 2... after every second, starting 0,5s from now
// const combinedTimersObs$ = combineLatest(firstTimerObs$, secondTimerObs$);
// combinedTimersObs$.subscribe(value => addItem(value));

// combine an array of observables

// const observables = [1, 5, 10].map(
//   n => of(n).pipe(
//     delay(n * 1000),   // emit 0 and then emit n after n seconds
//     startWith(0),
//   )
// );
// const combined = combineLatest(observables);
// combined.subscribe(value => addItem(value));



// Debounce and Distinct Until Changed

// const input = document.querySelector('input');
// const obs$ = fromEvent(input, 'input');
// obs$.pipe(
//   map((event:any) => event.target.value),
//   debounceTime(1000),
//   distinctUntilChanged()
//   )
//   .subscribe((value) => addItem(value));

// ------
// RECIPE
// ------

// const getContinents = (keys:any) =>
//   [
//     'africa',
//     'antarctica',
//     'asia',
//     'australia',
//     'europe',
//     'north america',
//     'south america'
//   ].filter(e => e.indexOf(keys.toLowerCase()) > -1);

// const fakeContinentsRequest = (keys:any) =>
//   of(getContinents(keys)).pipe(
//     tap(_ => console.log(`API CALL at ${new Date()}`))
//   );

// fromEvent(document.getElementById('type-ahead'), 'keyup')
//   .pipe(
//     debounceTime(200),
//     map((e: any) => e.target.value),
//     distinctUntilChanged(),
//     switchMap(fakeContinentsRequest),
//     tap(c => (document.getElementById('output').innerText = c.join('\n')))
//   )
//   .subscribe();