// A first try with rust
//
// Rust is a compiling programming language like c.
// but it has many modern feautures and not necessary to worry about memory management.
// I think this is the "low-level" language I gonna learn
//
fn main() {
    println!("{}", factorial(5));   // my first try is println!(factorial(5)), and error info is impressive!
    println!("{}", factorial2(5));
    println!("{}", factorial3(5));
}

// Below are some factorial implementation in rust from wikipedia

// recursion
fn factorial(i: u64) -> u64 {
    match i {
        0 => 1,
        n => n * factorial(n - 1)
    }
}

// iterative
fn factorial2(i: u64) -> u64 {
    let mut acc = 1;
    for num in 2..=i {
        acc *= num;
    }
    acc
}

// iterator
fn factorial3(i: u64) -> u64 {
    (1..=i).product()
}
