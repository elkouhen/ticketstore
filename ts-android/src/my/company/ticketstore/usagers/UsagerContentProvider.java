package my.company.ticketstore.usagers;

import android.content.ContentProvider;
import android.content.ContentUris;
import android.content.ContentValues;
import android.content.UriMatcher;
import android.database.Cursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteQueryBuilder;
import android.net.Uri;

public class UsagerContentProvider extends ContentProvider {

	public static final String AUTHORITY = "my.company.ticketstore.usagers.UsagerContentProvider";
	private static final String P_USAGER = "usager";
	private static UriMatcher sUriMatcher;

	static {
		sUriMatcher = new UriMatcher(UriMatcher.NO_MATCH);
		sUriMatcher.addURI(AUTHORITY, P_USAGER, 1);
	}

	private UsagerDatabaseHelper dbHelper;

	@Override
	public int delete(Uri uri, String selection, String[] selectionArgs) {

		throw new UnsupportedOperationException("Not yet implemented");
	}

	@Override
	public String getType(Uri uri) {

		return "vnd.android.cursor.dir/usagers";
	}

	@Override
	public Uri insert(Uri uri, ContentValues initialValues) {
		if (sUriMatcher.match(uri) != 1) {
			throw new IllegalArgumentException("Unknown URI " + uri);
		}

		SQLiteDatabase db = dbHelper.getWritableDatabase();
		long rowId = db.insert(UsagerTableInfo.T_USAGER, null, initialValues);
		if (rowId > 0) {
			Uri usagerUri = ContentUris
					.withAppendedId(Uri.parse("content://" + AUTHORITY + "/"
							+ P_USAGER), rowId);
			getContext().getContentResolver().notifyChange(usagerUri, null);
			return usagerUri;
		}

		throw new SQLException("Failed to insert row into " + uri);
	}

	@Override
	public boolean onCreate() {

		dbHelper = new UsagerDatabaseHelper(getContext(), P_USAGER, null, 1);

		dbHelper.onCreate(dbHelper.getWritableDatabase());

		return true;
	}

	@Override
	public Cursor query(Uri uri, String[] projection, String selection,
			String[] selectionArgs, String sortOrder) {
		SQLiteQueryBuilder qb = new SQLiteQueryBuilder();

		switch (sUriMatcher.match(uri)) {
		case 1:
			qb.setTables(UsagerTableInfo.T_USAGER);

			break;

		default:
			throw new IllegalArgumentException("Unknown URI " + uri);
		}

		SQLiteDatabase db = dbHelper.getReadableDatabase();

		Cursor c = qb.query(db, new String[] { UsagerTableInfo.C_ID,
				UsagerTableInfo.C_LASTNAME, UsagerTableInfo.C_FIRSTNAME,
				UsagerTableInfo.C_ADRESSE, UsagerTableInfo.C_DATE_NAISSANCE,
				UsagerTableInfo.C_EMAIL, UsagerTableInfo.C_TELEPHONE },
				selection, selectionArgs, null, null, sortOrder);

		c.setNotificationUri(getContext().getContentResolver(), uri);
		return c;

	}

	@Override
	public int update(Uri uri, ContentValues values, String selection,
			String[] selectionArgs) {

		SQLiteDatabase db = dbHelper.getReadableDatabase();

		int updateResult = db.update(UsagerTableInfo.T_USAGER, values,
				UsagerTableInfo.C_ID + "=" + getId(uri), null);

		getContext().getContentResolver().notifyChange(uri, null);

		return updateResult;
	}

	private long getId(Uri uri) {
		String lastPathSegment = uri.getLastPathSegment();
		if (lastPathSegment != null) {
			try {
				return Long.parseLong(lastPathSegment);
			} catch (NumberFormatException e) {

			}
		}
		return -1;
	}
}
