package my.company.ticketstore.usagers;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteDatabase.CursorFactory;
import android.database.sqlite.SQLiteOpenHelper;

class UsagerDatabaseHelper extends SQLiteOpenHelper {

	public UsagerDatabaseHelper(Context context, String name,
			CursorFactory factory, int version) {
		super(context, name, factory, version);
	}

	@Override
	public void onCreate(SQLiteDatabase db) {
		db.execSQL("DROP TABLE IF EXISTS " + UsagerTableInfo.T_USAGER);
		db.execSQL("CREATE TABLE " + UsagerTableInfo.T_USAGER + " ( "
				+ UsagerTableInfo.C_ID + " INTEGER PRIMARY KEY AUTOINCREMENT, "
				+ UsagerTableInfo.C_LASTNAME + " VARCHAR(255), "
				+ UsagerTableInfo.C_FIRSTNAME + " VARCHAR(255), "
				+ UsagerTableInfo.C_EMAIL + " VARCHAR(255), "
				+ UsagerTableInfo.C_DATE_NAISSANCE + " VARCHAR(255), "
				+ UsagerTableInfo.C_ADRESSE + " VARCHAR(255), "
				+ UsagerTableInfo.C_TELEPHONE + " VARCHAR(255) " + " );");

		db.execSQL("INSERT INTO "
				+ UsagerTableInfo.T_USAGER
				+ " VALUES (1, 'El kouhen', 'Christine', 'christine.elkouhen@gmail.com', "
				+ "'20/10/1974', '17 B, rue du moulin rouge Pont Saint Martin 44860', '0632141397');");
	}

	@Override
	public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {

		onCreate(db);
	}
}