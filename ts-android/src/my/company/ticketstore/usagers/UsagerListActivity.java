package my.company.ticketstore.usagers;

import my.company.ticketstore.R;
import android.app.ListActivity;
import android.content.Intent;
import android.database.Cursor;
import android.database.CursorWrapper;
import android.net.Uri;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.SimpleCursorAdapter;

public class UsagerListActivity extends ListActivity {

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		Cursor cursor = getContentResolver().query(
				Uri.parse("content://" + UsagerContentProvider.AUTHORITY
						+ "/usager"), null, null, null, null);

		ListAdapter adapter = new SimpleCursorAdapter(this,
				android.R.layout.simple_list_item_2, cursor, new String[] {
						UsagerTableInfo.C_ID, UsagerTableInfo.C_LASTNAME },
				new int[] { android.R.id.text1, android.R.id.text2 });

		setListAdapter(adapter);

	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {

		MenuItem item = menu.add("Nouvel User");

		final UsagerListActivity current = this;

		item.setOnMenuItemClickListener(new android.view.MenuItem.OnMenuItemClickListener() {

			@Override
			public boolean onMenuItemClick(MenuItem arg0) {

				Intent intent = new Intent(current, UsagerActivity.class);

				startActivity(intent);
				return true;
			}

		});

		getMenuInflater().inflate(R.menu.activity_usagers, menu);
		return true;
	}

	@Override
	protected void onListItemClick(ListView l, View v, int position, long id) {
		CursorWrapper obj = (CursorWrapper) getListAdapter().getItem(
				(int) id - 1);

		Intent intent = new Intent(this,
				my.company.ticketstore.usagers.UsagerActivity.class);

		intent.putExtra(UsagerTableInfo.C_ID, obj.getString(0));
		intent.putExtra(UsagerTableInfo.C_LASTNAME, obj.getString(1));
		intent.putExtra(UsagerTableInfo.C_FIRSTNAME, obj.getString(2));
		intent.putExtra(UsagerTableInfo.C_EMAIL, obj.getString(3));
		intent.putExtra(UsagerTableInfo.C_DATE_NAISSANCE, obj.getString(4));
		intent.putExtra(UsagerTableInfo.C_ADRESSE, obj.getString(5));
		intent.putExtra(UsagerTableInfo.C_TELEPHONE, obj.getString(6));

		startActivity(intent);
	}
}
