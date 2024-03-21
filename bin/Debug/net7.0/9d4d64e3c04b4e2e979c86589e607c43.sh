function list_child_processes () {
    local ppid=$1;
    local current_children=$(pgrep -P $ppid);
    local local_child;
    if [ $? -eq 0 ];
    then
        for current_child in $current_children
        do
          local_child=$current_child;
          list_child_processes $local_child;
          echo $local_child;
        done;
    else
      return 0;
    fi;
}

ps 78660;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 78660 > /dev/null;
done;

for child in $(list_child_processes 78700);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/casperpilgaard/Desktop/test/bin/Debug/net7.0/9d4d64e3c04b4e2e979c86589e607c43.sh;
