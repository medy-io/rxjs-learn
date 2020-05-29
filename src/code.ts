import {Observable, of, Subject, BehaviorSubject, ReplaySubject} from "rxjs";
import {fromEvent} from "rxjs";

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
let subject = new ReplaySubject(30, 200);

subject.subscribe(
  (data) => addItem("Observer 1: " + data),
  (err) => addItem(err),
  () => addItem("Observer 1 Completed")
);

subject.next("Sent first item");
subject.next("kjhhkhkhhhuyu");
subject.next("...Observer 2 is about to subscribe");

let observer2 = subject.subscribe((data) => addItem("Observer 2: " + data));

subject.next("Sent second item");
subject.next("Sent third item");

observer2.unsubscribe();

subject.next("Sent final item");

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
