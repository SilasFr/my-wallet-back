import db from '../db.js';
import dayjs from 'dayjs';

async function getBalanceSheet(req, res) {
  const user = res.locals.user;

  try {
    const balanceSheet = await db
      .collection('balanceSheets')
      .findOne({ userId: user._id });
    res.send({ user, balanceSheet });
  } catch (error) {
    res.sendStatus(500);
  }
}

async function postNewRegistry(req, res) {
  const user = res.locals.user;

  try {
    const userBalanceSheet = await db
      .collection('balanceSheets')
      .findOne({ userId: user._id });
    if (!userBalanceSheet) {
      return res.sendStatus(404);
    }
    await db.collection('balanceSheets').updateOne(
      { userId: user._id },
      {
        $push: {
          balanceSheet: {
            ...req.body,
            date: dayjs().format('DD/MM'),
          },
        },
      }
    );

    const balanceSheetObject = await db
      .collection('balanceSheets')
      .findOne({ userId: user._id });

    const balanceSheet = balanceSheetObject.balanceSheet;
    let deposits = balanceSheet.filter((item) => {
      if (item.character === 'deposit') {
        return item;
      }
    });
    let withdrawals = balanceSheet.filter((item) => {
      if (item.character === 'withdrawal') {
        return item;
      }
    });

    let sumDeposits = 0;
    deposits.forEach((deposit) => {
      return (sumDeposits += parseFloat(deposit.value.replace(',', '.')));
    });

    let sumWithdrawals = 0;
    withdrawals?.forEach((withdrawal) => {
      return (sumWithdrawals += parseFloat(withdrawal.value));
    });

    const newExtract =
      (!sumDeposits ? 0 : sumDeposits) - (!sumWithdrawals ? 0 : sumWithdrawals);
    await db.collection('balanceSheets').updateOne(
      { userId: user._id },
      {
        $set: { extract: newExtract },
      }
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export { getBalanceSheet, postNewRegistry };
