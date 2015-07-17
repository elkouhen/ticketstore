package my.company.ticketstore.usagers;

import my.company.ticketstore.R;
import android.app.Activity;
import android.content.ContentValues;
import android.net.Uri;
import android.os.Bundle;
import android.view.Menu;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;

public class UsagerActivity extends Activity {

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_usager);

		final EditText lastNameView = (EditText) this
				.findViewById(R.id.lastname);
		final EditText firstNameView = (EditText) this
				.findViewById(R.id.firstname);
		final EditText emailView = (EditText) this.findViewById(R.id.email);
		final EditText dateNaissanceView = (EditText) this
				.findViewById(R.id.dateNaissance);
		final EditText adresseView = (EditText) this.findViewById(R.id.adresse);
		final EditText telephoneView = (EditText) this
				.findViewById(R.id.telephone);
		Button button = (Button) this.findViewById(R.id.submit);

		lastNameView.setText(getIntent().getStringExtra(
				UsagerTableInfo.C_LASTNAME));

		firstNameView.setText(getIntent().getStringExtra(
				UsagerTableInfo.C_FIRSTNAME));
		emailView.setText(getIntent().getStringExtra(UsagerTableInfo.C_EMAIL));

		dateNaissanceView.setText(getIntent().getStringExtra(
				UsagerTableInfo.C_DATE_NAISSANCE));
		adresseView.setText(getIntent().getStringExtra(
				UsagerTableInfo.C_ADRESSE));

		telephoneView.setText(getIntent().getStringExtra(
				UsagerTableInfo.C_TELEPHONE));

		final String id = getIntent().getStringExtra(UsagerTableInfo.C_ID);

		button.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {

				ContentValues contentValues = new ContentValues();

				contentValues.put(UsagerTableInfo.C_LASTNAME, lastNameView
						.getText().toString());
				contentValues.put(UsagerTableInfo.C_FIRSTNAME, firstNameView
						.getText().toString());

				contentValues.put(UsagerTableInfo.C_EMAIL, emailView.getText()
						.toString());
				contentValues.put(UsagerTableInfo.C_DATE_NAISSANCE,
						dateNaissanceView.getText().toString());

				contentValues.put(UsagerTableInfo.C_ADRESSE, adresseView
						.getText().toString());
				contentValues.put(UsagerTableInfo.C_TELEPHONE, telephoneView
						.getText().toString());

				if (id != null) {
					getContentResolver().update(
							Uri.parse("content://"
									+ UsagerContentProvider.AUTHORITY
									+ "/usager/" + id), contentValues, null,
							null);
				} else {

					getContentResolver().insert(
							Uri.parse("content://"
									+ UsagerContentProvider.AUTHORITY
									+ "/usager/"), contentValues);
				}

				finish();
			}
		});
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {

		getMenuInflater().inflate(R.menu.activity_usager, menu);
		return true;
	}
}
