function findDuplicateTransactions(transactions = []) {
  if (transactions.length > 0) {
    // Sort transactions based on time ascendingly
    const sortedTransactions = transactions.sort((a, b) => {
      return new Date(Date.parse(a.time)) - new Date(Date.parse(b.time));
    });

    let duplicatedTransaction = [];

    // Loop the sorted transaction array until it's empty
    while (sortedTransactions.length > 0) {
      let duplicatedTransactionsPerCategory = [];

      // Load the first transaction
      let lastTrans = sortedTransactions.shift();
      duplicatedTransactionsPerCategory.push(lastTrans);

      let index = 0;
      // Loop the sorted transaction array until there's no category same as lastTrans
      while (index < sortedTransactions.length) {
        if (sortedTransactions[index].category == lastTrans.category) {
          // Pop current index transaction
          let [curTrans] = sortedTransactions.splice(index, 1);

          const lastTransDateTime = new Date(Date.parse(lastTrans.time));
          const currentTransDateTime = new Date(Date.parse(curTrans.time));

          // Check date time between current transaction and last transaction if it's less than 1 min
          if (currentTransDateTime - lastTransDateTime < 60000) {
            lastTrans = curTrans;
            duplicatedTransactionsPerCategory.push(lastTrans);
          }
        } else {
          index++;
        }
      }
      duplicatedTransaction.push(duplicatedTransactionsPerCategory);
    }

    return duplicatedTransaction;
  }

  return transactions;
}

module.exports = findDuplicateTransactions;
