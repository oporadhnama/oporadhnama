 targets,
    ...<3 lines>...
        fake_initial=fake_initial,
    )
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/migrations/executor.py", line 135, in migrate
    state = self._migrate_all_forwards(
        state, plan, full_plan, fake=fake, fake_initial=fake_initial
    )
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/migrations/executor.py", line 167, in _migrate_all_forwards
    state = self.apply_migration(
        state, migration, fake=fake, fake_initial=fake_initial
    )
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/migrations/executor.py", line 249, in apply_migration
    with self.connection.schema_editor(
         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^
        atomic=migration.atomic
        ^^^^^^^^^^^^^^^^^^^^^^^
    ) as schema_editor:
    ^
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/backends/base/schema.py", line 166, in __exit__
    self.execute(sql)
    ~~~~~~~~~~~~^^^^^
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/backends/postgresql/schema.py", line 48, in execute
    return super().execute(sql, None)
           ~~~~~~~~~~~~~~~^^^^^^^^^^^
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/backends/base/schema.py", line 201, in execute
    cursor.execute(sql, params)
    ~~~~~~~~~~~~~~^^^^^^^^^^^^^
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/backends/utils.py", line 67, in execute
    return self._execute_with_wrappers(
           ~~~~~~~~~~~~~~~~~~~~~~~~~~~^
        sql, params, many=False, executor=self._execute
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    )
    ^
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/backends/utils.py", line 80, in _execute_with_wrappers
    return executor(sql, params, many, context)
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/backends/utils.py", line 84, in _execute
    with self.db.wrap_database_errors:
         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/utils.py", line 91, in __exit__
    raise dj_exc_value.with_traceback(traceback) from exc_value
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/backends/utils.py", line 87, in _execute
    return self.cursor.execute(sql)
           ~~~~~~~~~~~~~~~~~~~^^^^^
django.db.utils.ProgrammingError: relation "archive_post_slug_7abefc9f_like" already exists
==> Build failed 😞
==> Common ways to troubleshoot your deploy: https://render.com/docs/troubleshooting-deploys
  Applying archive.0007_add_post_slug...